import './globals.css'

export const metadata = {
  title: 'DataAnalysis Pro',
  description: 'Master data analysis with theory, videos, quizzes, and projects.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
