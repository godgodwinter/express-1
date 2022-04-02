const uniqueValidator = require('mongoose-unique-validator');

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      tingkatan: {
        type: String,
        required: [true, 'tingkatan harus diisi'],
        maxlength: [10, 'panjang tingkatan harus antara 1 - 10 karakter'],
        minlength: [1, 'panjang tingkatan harus antara 1 - 10 karakter'],
        unique: false,
      },
      jurusan: {
        type: String,
        required: [true, 'jurusan harus diisi'],
        maxlength: [10, 'panjang jurusan harus antara 1 - 10 karakter'],
        minlength: [1, 'panjang jurusan harus antara 1 - 10 karakter'],
        unique: false,
      },
      suffix: {
        type: String,
        required: [true, 'suffix harus diisi'],
        maxlength: [10, 'panjang suffix harus antara 1 - 10 karakter'],
        minlength: [1, 'panjang suffix harus antara 1 - 10 karakter'],
        unique: false,
      },
      // siswa: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Siswa' }],
      status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'N',
      },
    },
    { timestamps: true },
  );
  schema.index({ tingkatan: 1, jurusan: 1, suffix: 1 }, { unique: true });
  schema.plugin(uniqueValidator);

  schema.method('toJSON', function changeId() {
    const { __v, _id, ...Object } = this.toObject();
    Object.id = _id;
    return Object;
  });
  const Kelas = mongoose.model('Kelas', schema);
  return Kelas;
};
