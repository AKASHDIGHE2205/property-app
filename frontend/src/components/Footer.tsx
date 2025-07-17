
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <footer className="relative overflow-hidden dark:bg-gray-800 bg-gray-200 p-4 text-center">
        <h1 className="text-sm text-gray-700 dark:text-gray-300">© Malpani Group {currentYear}. All Rights Reserved.</h1>
      </footer>
    </div>
  )
}

export default Footer