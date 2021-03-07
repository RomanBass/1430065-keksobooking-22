const getData = (onSuccess, onError) => { // получение данных с сервера
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} (${response.statusText}).`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    })
};

const sendData = (onSuccess, onError, data) => {
  fetch('https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError(`${response.status} (${response.statusText}).`);
      }
    })
    .catch((err) => {
      onError(err);
    })
};

export {getData, sendData};
