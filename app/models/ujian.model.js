const uniqueValidator = require('mongoose-unique-validator');

module.exports = (mongoose) => {
  const dataSchema = mongoose.Schema(
    {
      date: {
        type: Date,
      },
      waktu: {
        type: String, //berapa jam ? 60mnt 90mnt
      },
      pengawas: {
        type: String,
        required: [true, 'name harus diisi'],
        maxlength: [100, 'panjang name harus antara 1 - 100 karakter'],
        minlength: [1, 'panjang name harus antara 1 - 100 karakter'],
      },
      paketsoal: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Paketsoal' }],
      peserta: [{
        siswa: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Siswa' }],
        hasil: {
          type: Number,
        },
        rekapSoal: [{
          kodesoal: String, //uuid
          tipesoal: String,
          pertanyaan: String,
          pilihanJawaban: [{
            jawaban: String,
            statusJawaban: Boolean,
          }],
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
  const Ujian = mongoose.model('Ujian', dataSchema);
  return Ujian;
};
