type ValidatorType =
  | 'email'
  | 'username'
  | 'number'
  | 'numberbtn'
  | 'password'
  | 'phone'
  | 'select'
  | 'addres'
  | 'onlyText';

interface validatorResponse {
  isValidInput: boolean;
  msg: string;
}

interface selectionInput {
  type: string;
  data: [];
}

const regPhone = /^\d{10}$/;
const regNumber = /^\d+$/;
const regNumberBtn = /^\d+(\.\d+)*$/;
const regCorreo =
  /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
const regUser = /^[a-zA-Z0-9]+$/;
const regPassword =
  /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
//const regOnlyText = /^[a-zA-Z\s]+$/;
const regOnlyText = /^[\p{L}\p{M}\p{N}\p{Zs}]+$/u


const regDireccion =
  /^(autopista|avenida|avdacalle|avdacarrera|avenidacalle|avenidacarrera|avenida|carrera|calle|circunvalar|diagonal|kilometro|transversal|transv|trans|av|avcalle|avcarrera|avcra|avcll|avda|ac|ak|cl|cll|clle|kr|kra|cra|cra.|ccv|dg|dg.|diag|km|tv|autop)([0-9]{1,3})([a-z]{0,1})(bis[a-z]{0,1})?(este|norte|occidente|oeste|sur|e|n|o|s)?(#|n°|n|\s*|no|No|N|N°)([0-9]{1,3})([a-z]{0,1})(bis[a-z]{0,1})?(este|norte|occidente|oeste|sur|e|n|o|s)?(-|\s*)([0-9]{1,3})(este|norte|occidente|oeste|sur|e|n|o|s)?(,)?$/;
/*const regDireccionComplement =
  /^(autopista|avenida|avdacalle|avdacarrera|avenidacalle|avenidacarrera|avenida|carrera|calle|circunvalar|diagonal|kilometro|transversal|transv|trans|av|avcalle|avcarrera|avcra|avcll|avda|ac|ak|cl|cll|clle|kr|kra|cra|cra.|ccv|dg|dg.|diag|km|tv|autop)([0-9]{1,3})([a-z]{0,1})(bis[a-z]{0,1})?(este|norte|occidente|oeste|sur|e|n|o|s)?(#|n°|n|\s*|no|No|N|N°)([0-9]{1,3})([a-z]{0,1})(bis[a-z]{0,1})?(este|norte|occidente|oeste|sur|e|n|o|s)?(-|\s*)([0-9]{1,3})(este|norte|occidente|oeste|sur|e|n|o|s)?(,)??.*$/;
  */

const validators: Record<ValidatorType, (text: string) => validatorResponse> = {
  email: (text: string) => ({
    isValidInput: regCorreo.test(text),
    msg: 'Esta no es una dirección de correo valida',
  }),
  username: (text: string) => ({
    isValidInput: regUser.test(text),
    msg: 'Este usuario no es valido solo se aceptan letras y numeros',
  }),
  number: (text: string) => ({
    isValidInput: regNumber.test(text),
    msg: 'Este campo solo acepta numeros',
  }),
  numberbtn: (text: string) => ({
    isValidInput: regNumberBtn.test(text),
    msg: 'Este campo solo acepta numeros',
  }),
  password: (text: string) => ({
    isValidInput: regPassword.test(text),
    msg: 'Esta contraseña no es válida, mínimo 8 caracteres, una mayúscula, un número y un carácter especial',
  }),
  phone: (text: string) => ({
    isValidInput: regPhone.test(text),
    msg: 'Numero de telefono no valido 10 caracteres',
  }),
  onlyText: (text: string) => ({
    isValidInput: regOnlyText.test(text),
    msg: 'Campo no valido solo se permite texto',
  }),
  addres: (text: string) => {
    let textoFormateado = text.toLowerCase().replace(/\s+/g, '');
    return {
      isValidInput: regDireccion.test(textoFormateado),
      msg: 'Direccion no valida ej: Cra 97 #129fSur-06',
    };
  },
  select: (input: any) => ({
    isValidInput: input.length > 0,
    msg: 'Debe seleccionar una opción',
  }),
};

export const multyValidation = (inputs: Array<t>) => {
  let isValidated = true;
  for (let input of inputs) {
    const {isValidInput, msg} =
      input.type === 'select'
        ? validateSelect(input)
        : validateInput(input.type, input.text);
    if (!isValidInput) {
      isValidated = false;
      input.setError(msg);
    }
  }

  return isValidated;
};

export const validateSelect = (input: selectionInput) => {
  const validator = validators[input.type];

  if (!validator) {
    throw new Error(`No hay validador para el tipo: ${input.type}`);
  }

  return validator(input.data);
};

export const validateInput = (type: string, text: string) => {
  const cleanText = text.trim();
  if (cleanText === '') {
    return {
      isValidInput: false,
      msg: 'esta casilla es obligatoria',
    };
  }

  if (type === 'none') {
    return {
      isValidInput: true,
      msg: '',
    };
  }

  const validator = validators[type];

  if (!validator) {
    throw new Error(`No hay validador para el tipo: ${type}`);
  }

  return validator(cleanText);
};
