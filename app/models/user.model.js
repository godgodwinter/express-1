const uniqueValidator = require('mongoose-unique-validator');

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'nama harus diisi'],
        maxlength: [225, 'panjang nama harus antara 3 - 225 karakter'],
        minlength: [3, 'panjang nama harus antara 3 - 225 karakter'],
      },
      email: {
        type: String,
        required: [true, 'email harus diisi'],
        unique: true,
      },
      username: {
        type: String,
        required: [true, 'username harus diisi'],
        maxlength: [225, 'panjang username harus antara 3 - 225 karakter'],
        minlength: [3, 'panjang username harus antara 3 - 225 karakter'],
      },
      nomerinduk: {
        type: String,
        required: [false, 'nomerinduk harus diisi'],
        maxlength: [225, 'panjang nomerinduk harus antara 3 - 225 karakter'],
        minlength: [3, 'panjang nomerinduk harus antara 3 - 225 karakter'],
      },
      role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
      },
      password: {
        type: String,
        required: [true, 'kata sandi harus diisi'],
        maxlength: [225, 'panjang password maksimal 225 karakter'],
      },
      status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y',
      },
      phone: {
        type: String,
        required: [true, 'nomor telpon harus diisi'],
        maxlength: [13, 'panjang nomor telpon harus antara 9 - 13 karakter'],
        minlength: [9, 'panjang nomor telpon harus antara 9 - 13 karakter'],
      },
    },
    { timestamps: true },
  );
  schema.plugin(uniqueValidator);
  // schema.path('email').validate(async function valEmail(value) {
  //   try {
  //     const count = await this.model('users').countDocuments({ email: email });
  //     return !count;
  //   } catch (err) {
  //     throw err;
  //   }
  // }, (attr) => `${attr.value} sudah terdaftar`);

  // schema.pre('save', (next) => {
  //   if (email()) {
  //     console.log('calling next!');
  //     // `return next();` will make sure the rest of this function doesn't run
  //     /* return */ next();
  //   }
  //   // Unless you comment out the `return` above, 'after next' will print
  //   console.log('after next');
  // });

  schema.method('toJSON', function changeId() {
    const { __v, _id, ...Object } = this.toObject();
    Object.id = _id;
    return Object;
  });
  const User = mongoose.model('User', schema);
  return User;
};
