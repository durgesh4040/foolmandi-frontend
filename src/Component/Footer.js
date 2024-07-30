import { location2 } from "react-icons-kit/icomoon/location2";
import { phone } from "react-icons-kit/icomoon/phone";
import { Icon } from "react-icons-kit";
import { envelop } from "react-icons-kit/icomoon/envelop";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-10">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col md:flex-row justify-between">
        {/* About and Quick Links Section */}
        <div className="w-full md:w-2/3 flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h1 className="text-3xl font-bold mb-4">PhoolMandi</h1>
            <h2 className="text-2xl m-2 ">About Us</h2>
            <div className="flex-auto m-2">
              PhoolMandi helps flower vendors create online shops to increase
              their sales and allows customers to buy flowers directly from
              sellers, ensuring heavy discounts.
            </div>
          </div>
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl mb-4">Quick Links</h2>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/directbuy" className="hover:underline">
                    DirectBuy
                  </a>
                </li>
                <li>
                  <a href="/becameseller" className="hover:underline">
                    Become a Seller
                  </a>
                </li>
                <li>
                  <a href="/login" className="hover:underline">
                    Login
                  </a>
                </li>
              </ul>
              <ul className="space-y-2">
                <li>
                  <a href="/signup" className="hover:underline">
                    Signup
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:underline">
                    Logout
                  </a>
                </li>
                <li>
                  <a href="/product" className="hover:underline">
                    Product
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="w-full md:w-1/3 mt-6 md:mt-0">
          <h2 className="text-2xl mb-4">Contact Us</h2>
          <div className="flex items-center mb-4">
            <Icon icon={envelop} size={24} />
            <p className="ml-3">phoolmandi.in@gmail.com</p>
          </div>
          <div className="flex items-center mb-4">
            <Icon icon={phone} size={24} />
            <p className="ml-3">6394423282</p>
          </div>
          <div className="flex items-center">
            <Icon icon={location2} size={24} />
            <p className="ml-3">kanpur</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white mt-6 pt-4 text-center">
        <p>&copy; 2024 PhoolMandi.in All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
