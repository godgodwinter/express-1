const uniqueValidator = require('mongoose-unique-validator');

module.exports = (mongoose) => {
  const dataSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'name harus diisi'],
        maxlength: [100, 'panjang name harus antara 1 - 100 karakter'],
        minlength: [1, 'panjang name harus antara 1 - 100 karakter'],
        unique: true,
      },
      // type: {
      //   type: String,
      //   required: [true, 'Tipe harus diisi'],
      //   maxlength: [100, 'panjang Tipe harus antara 1 - 100 karakter'],
      //   minlength: [1, 'panjang Tipe harus antara 1 - 100 karakter'],
      //   unique: false,
      // },
      kkm: {
        type: Number,
      },
      // tingkatan: {
      //   type: Array,
      // },
      // jurusan: {
      //   type: Array,
      // },
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
  const Mapel = mongoose.model('Mapel', dataSchema);
  return Mapel;
};
