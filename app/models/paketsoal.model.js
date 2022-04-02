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
      kkm: {
        type: Number,
      },
      kelas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Kelas' }],
      mapel: [{ type: mongoose.Schema.Types.ObjectId, ref: 'mapel' }],
      soal: [{
        tipesoal: String,
        pertanyaan: String,
        pilihanJawaban: [{
          jawaban: String,
          statusJawaban: Boolean,
        }],
      }],
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
  const Paketsoal = mongoose.model('Paketsoal', dataSchema);
  return Paketsoal;
};
