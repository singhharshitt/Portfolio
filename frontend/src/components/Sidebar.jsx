export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, scrollToSection }) {
  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      {/* sidebar */}
      <div
        className={`
  flex-col border-2 border-black h-[360px] w-[260px] absolute right-4 lg:right-[30px] top-[110px] 
  gap-4 font-snpro p-2 z-40 flex bg-white
  transition-all duration-300 ease-in-out transform
  ${isSidebarOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
          }
`}
      >
        <div className="border-b-4 border-dotted text-[30px] font-bold text-center min-w-full py-8 px-2 Neu">
          CODE CRAFTED
        </div>
        <div className="text-[28px] text-center border-b border-dashed">
          <button onClick={() => scrollToSection('techstack')} className="w-full hover:text-orange-400 transition-colors">Work</button>
        </div>
        <div className="text-[28px] text-center border-b border-dashed">
          <button onClick={() => scrollToSection('about')} className="w-full hover:text-orange-400 transition-colors">About</button>
        </div>
        <div className="text-[28px] text-center border-b border-dashed">
          <button onClick={() => scrollToSection('journey')} className="w-full hover:text-orange-400 transition-colors">Journey</button>
        </div>
        <div className="flex gap-3 py-2 justify-around">
          <a href="https://github.com/singhharshitt" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-orange-400 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-[28px] h-[28px]"
            >
              <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path>
            </svg>
          </a>
          <a href="https://twitter.com/singhharshitt" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-orange-400 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-[28px] h-[28px]"
            >
              <path d="M10.4883 14.651L15.25 21H22.25L14.3917 10.5223L20.9308 3H18.2808L13.1643 8.88578L8.75 3H1.75L9.26086 13.0145L2.31915 21H4.96917L10.4883 14.651ZM16.25 19L5.75 5H7.75L18.25 19H16.25Z"></path>
            </svg>
          </a>
          <a href="https://linkedin.com/in/singh-harshit-" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-orange-400 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              className="bi bi-linkedin"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
            </svg>
          </a>
        </div>
      </div>
    </>
  )

}