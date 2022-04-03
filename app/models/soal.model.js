const uniqueValidator = require('mongoose-unique-validator');

module.exports = (mongoose) => {
  const dataSchema = mongoose.Schema(
    {
      pertanyaan: {
        type: String,
        required: [true, 'name harus diisi'],
        minlength: [1, 'panjang name harus lebih dari  1 karakter'],
        unique: false,
      },
      photo: {
        type: String,
        minlength: [1, 'panjang photo harus lebih dari  1 karakter'],
        unique: false,
      },
      tipesoal: {
        type: String,
        required: [true, 'tipe soal harus diisi'],
        minlength: [1, 'panjang name harus lebih dari  1 karakter'],
      },
      banksoal: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Banksoal' }],
    },
    { timestamps: true },
  );
  dataSchema.plugin(uniqueValidator);

  dataSchema.method('toJSON', function changeId() {
    const { __v, _id, ...Object } = this.toObject();
    Object.id = _id;
    return Object;
  });
  const Soal = mongoose.model('Soal', dataSchema);
  return Soal;
};
