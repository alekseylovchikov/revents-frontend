import { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';

import { API_URL } from '@/config/index';
import { parseCookies } from '@/helpers/index';

import styles from '@/styles/Form.module.css';

import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import ImageUpload from '@/components/ImageUpload';

export default function EditEventPage({
  evt: {
    id,
    name,
    performers,
    venue,
    address,
    date,
    time,
    description,
    image,
  },
  token,
}) {
  const [values, setValues] = useState({
    name,
    performers,
    venue,
    address,
    date: moment(date).format('yyyy-MM-DD'),
    time,
    description,
  });
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    image ? image.formats.thumbnail.url : null
  );

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some(
      (el) => el.trim() === ''
    );

    if (hasEmptyFields) {
      toast.error('Пожалуйста заполните все поля');
    } else {
      const body = Object.entries(values).reduce(
        (acc, [key, value]) => {
          acc[key] = value.trim();
          return acc;
        },
        {}
      );
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error('Ошибка авторизации');
        } else {
          toast.error('Ошибка при создании события');
        }
      } else {
        const evt = await res.json();

        router.push(`/events/${evt.slug}`);
      }
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  }

  async function imageUploaded() {
    const res = await fetch(`${API_URL}/events/${id}`);
    const data = await res.json();
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  }

  return (
    <Layout title="Редактировать событие">
      <Link href="/events">
        <a>{'<'} К списку</a>
      </Link>
      <h1>Редактировать событие</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Название события</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Выступающие</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Место проведения</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Адрес</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Дата проведения</label>
            <input
              type="date"
              name="date"
              id="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Время проведения</label>
            <input
              type="time"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Описание</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Обновить" className="btn" />
      </form>

      {imagePreview ? (
        <div className="image-cover">
          <Image src={imagePreview} width={200} height={100} />
        </div>
      ) : (
        <div>
          <p>Нет загруженного изображения</p>
        </div>
      )}

      <div>
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="btn-secondary"
        >
          <FaImage /> Загрузить изображение
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          token={token}
          evtId={id}
          imageUploaded={imageUploaded}
        />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const res = await fetch(`${API_URL}/events/${id}`);
  const evt = await res.json();
  const { token } = parseCookies(req);

  return {
    props: {
      evt,
      token,
    },
  };
}
