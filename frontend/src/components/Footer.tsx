
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <footer className="relative overflow-hidden dark:bg-slate-800 bg-slate-200 p-4 text-center">
        <h1 className="text-sm text-slate-700 dark:text-slate-300">© Malpani Group {currentYear}. All Rights Reserved.</h1>
      </footer>
    </div>
  )
}

export default Footer