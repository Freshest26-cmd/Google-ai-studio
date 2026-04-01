export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pt-[120px] pb-12 px-4 md:px-8 max-w-[1280px] mx-auto border-t border-white/5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
        {/* Column 1: Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-white" />
            </div>
            <div className="flex flex-col leading-none font-bold text-[10px] tracking-tighter uppercase text-white">
              <span>Elite</span>
              <span>Gear</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Elevating your lifestyle through innovative technology and premium design.
          </p>
        </div>

        {/* Column 2: Products */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Products</h4>
          <div className="flex flex-col gap-3">
            {["Pro Series", "Limited Drops", "Accessories", "Custom Gear"].map((link) => (
              <a key={link} href="#" className="text-gray-500 hover:text-accent text-sm transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Column 3: Company */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Company</h4>
          <div className="flex flex-col gap-3">
            {["About Us", "Sustainability", "Careers", "Press"].map((link) => (
              <a key={link} href="#" className="text-gray-500 hover:text-accent text-sm transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Column 4: Support */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Support</h4>
          <div className="flex flex-col gap-3">
            {["Help Center", "Shipping", "Returns", "Contact"].map((link) => (
              <a key={link} href="#" className="text-gray-500 hover:text-accent text-sm transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
        <p className="text-gray-600 text-[10px] uppercase tracking-widest">
          © {currentYear} Elite Gear. All rights reserved.
        </p>
        
        <div className="flex gap-8">
          {["Instagram", "Twitter", "YouTube"].map((social) => (
            <a key={social} href="#" className="text-gray-600 hover:text-white text-[10px] uppercase tracking-widest transition-colors">
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
