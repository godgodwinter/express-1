const uniqueValidator = require('mongoose-unique-validator');

module.exports = (mongoose) => {
  const dataSchema = mongoose.Schema(
    {
      jawaban: {
        type: String,
        required: [true, 'jawaban harus diisi'],
        minlength: [1, 'panjang jawaban harus lebih dari  1 karakter'],
        unique: false,
      },
      photo: {
        type: String,
        minlength: [1, 'panjang photo harus lebih dari  1 karakter'],
        unique: false,
      },
      statusjawaban: {
        type: Boolean,
        default: false,
      },
      soal: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Soal' }],
    },
    { timestamps: true },
  );
  dataSchema.plugin(uniqueValidator);

  dataSchema.method('toJSON', function changeId() {
    const { __v, _id, ...Object } = this.toObject();
    Object.id = _id;
    return Object;
  });
  const Pilihanjawaban = mongoose.model('Pilihanjawaban', dataSchema);
  return Pilihanjawaban;
};
