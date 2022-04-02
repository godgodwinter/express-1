const uniqueValidator = require('mongoose-unique-validator');

module.exports = (mongoose) => {
  const dataSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'name harus diisi'],
        maxlength: [100, 'panjang name harus antara 1 - 100 karakter'],
        minlength: [1, 'panjang name harus antara 1 - 100 karakter'],
        unique: false,
      },
      nis: {
        type: String,
        required: [true, 'nis harus diisi'],
        maxlength: [100, 'panjang nis harus antara 1 - 100 karakter'],
        minlength: [1, 'panjang nis harus antara 1 - 100 karakter'],
        unique: true,
      },
      // kelasId: [{ type: Schema.Types.ObjectId, ref:'kelas' }],
      kelas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Kelas' }],

      status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'N',
      },
    },
    { timestamps: true },
  );
  dataSchema.plugin(uniqueValidator);

  dataSchema.method('toJSON', function changeId() {
    const { __v, _id, ...Object } = this.toObject();
    Object.id = _id;
    return Object;
  });
  const Siswa = mongoose.model('Siswa', dataSchema);
  return Siswa;
};
