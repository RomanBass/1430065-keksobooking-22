import {form} from './form.js'

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarFileChooser = form.querySelector('.ad-form__field input[type=file]');
const avatarPreview = form.querySelector('.ad-form-header__preview img');
const housingFileChooser = form.querySelector('.ad-form__upload input[type=file]');
const housingPreviewBlock = form.querySelector('.ad-form__photo');

avatarFileChooser.addEventListener('change', () => {

  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((ending) => {
    return fileName.endsWith(ending);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

housingFileChooser.addEventListener('change', () => {

  const file = housingFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((ending) => {
    return fileName.endsWith(ending);
  });

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener('load', () => {
      housingPreviewBlock.innerHTML = `<img src="${reader.result}" alt="Фото жилья" width="70" height="70"></img>`;
    });
    reader.readAsDataURL(file);
  }
});
