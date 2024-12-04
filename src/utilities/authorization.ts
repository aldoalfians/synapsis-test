import { notification } from 'antd';
import { useEffect, useState } from 'react';

interface UserLogin {
  name?: string;
  token?: string;
}

const setUserData = (user: UserLogin) => {
  localStorage.setItem('access_user', JSON.stringify(user));
  localStorage.setItem('access_token', user.token || '');
};

export const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
});

export const useLogin = () => {
  const submitLogin = (values: UserLogin) => {
    if (typeof values?.name === 'string' && typeof values?.token === 'string') {
      window.location.reload();
      return setUserData(values);
    }

    return notification.open({
      type: 'error',
      message: 'Login gagal',
      description: 'Terjadi kesalahan saat login cek kembali nama dan token',
      placement: 'top',
    });
  };

  return {
    submitLogin,
  };
};

export const useGetLoggedUser = () => {
  const [userData, setUserData] = useState<UserLogin | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('access_user');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return userData;
};
