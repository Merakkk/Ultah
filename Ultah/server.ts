import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Express
const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with key protection
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API endpoint to generate creative, personalized birthday wishes
app.post('/api/generate-wish', async (req, res) => {
  try {
    const { partnerName, nickname, traits, dynamicOption, memories, tone } = req.body;

    if (!ai) {
      return res.status(500).json({
        error: 'API Gemini belum dikonfigurasi. Mohon tambahkan GEMINI_API_KEY di panel Secrets.',
      });
    }

    // Build prompting in Indonesian
    const prompt = `Buatkankan saya teks ucapan selamat ulang tahun yang sangat romantis, menyentuh hati, kreatif, dan personal untuk pasangan saya.
Informasi Pasangan:
- Nama Lengkap: ${partnerName || 'Sayang'}
- Nama Panggilan/Sapaan Manis: ${nickname || 'Sayang'}
- Sifat/Kebiasaan Unik: ${traits || 'baik hati dan selalu membuatku tersenyum'}
- Momen Indah Bersama: ${memories || 'menikmati senja bersama dan berkendara sore'}
- Pilihan Harapan Spesial: ${dynamicOption || 'Semoga kita selalu bersama selamanya'}
- Nada Ucapan (Tone): ${tone || 'romantis dan mendalam'}

Tulislah teks ucapan ini dalam Bahasa Indonesia yang indah, hangat, tulus, dan tidak klise. Gunakan sapaan manisnya secara alami. Ucapan ini harus terasa sangat personal seolah-olah ditulis langsung berjam-jam dengan penuh kasih sayang. Jangan berikan kalimat pembuka chatbot (seperti "Berikut adalah ucapan..."). Tulis langsung pesan ucapannya saja dalam 2-3 paragraf pendek atau tambahkan kutipan puisi manis di akhir.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
    });

    const generatedText = response.text || 'Gagal menghasilkan ucapan. Coba lagi nanti, ya!';
    res.json({ text: generatedText });
  } catch (error: any) {
    console.error('Error generating wish:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat membuat ucapan: ' + error.message });
  }
});

// Configure Vite or Static production serving
async function configureServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite Dev Middleware loaded.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production build files.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running internally on http://localhost:${PORT}`);
  });
}

configureServer().catch((err) => {
  console.error('Failed to start server:', err);
});
