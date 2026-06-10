/**
 * Safely and precisely scroll to a section on the page taking the collapsed navbar height into account.
 * Crucial for mobile layouts (iOS/Android) where the expanded sidebar height shouldn't pollute calculations.
 * 
 * @param {string} id The DOM element ID to scroll to
 */
export const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  
  const nav = document.querySelector('nav')
  let navHeight = 88
  
  if (nav && nav.children) {
    // Sum the announcement bar height and main header container height.
    // Exclude the mobile menu list height so scrolling is always precise.
    const h1 = nav.children[0] ? nav.children[0].offsetHeight : 0
    const h2 = nav.children[1] ? nav.children[1].offsetHeight : 0
    navHeight = (h1 + h2) || 88
  }
  
  // Calculate precise top offset relative to document body
  const elTop = el.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) - navHeight
  
  // Perform smooth scroll
  window.scrollTo({
    top: Math.max(0, elTop),
    behavior: 'smooth'
  })
}
