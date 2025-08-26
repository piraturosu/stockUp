import { Link } from "react-router-dom";
import {
  ClipboardDocumentListIcon,
  UsersIcon,
  ChartBarIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-12 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Never Forget an Order Item Again.
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Smart inventory management for restaurants and bars. Create stock
            lists, manage orders, and track suppliers with ease. Your ordering
            system built by kitchen professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/register">
              <button className="bg-primary hover:bg-logo text-white px-8 py-4 text-lg rounded-md transition-colors">
                Get Started
              </button>
            </Link>

            <Link to="/demo">
              <button className="text-gray-700 hover:text-primary px-8 py-4 text-lg transition-colors">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            The Cost of Manual Ordering
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Manual inventory tracking costs restaurants thousands in lost time,
            forgotten items, and inefficient ordering. Stop losing money on
            outdated processes that drain your staff's energy and your bottom
            line.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-destructive mb-2">
                3+ Hours
              </div>
              <div className="text-gray-600">
                Wasted daily on manual tracking
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-destructive mb-2">
                15%
              </div>
              <div className="text-gray-600">Average inventory waste</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-destructive mb-2">
                $2,400
              </div>
              <div className="text-gray-600">Monthly cost of inefficiency</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            StockUp: Your Smart Ordering Solution
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            StockUp is built by kitchen professionals who understand restaurant
            operations. Our smart ordering system eliminates forgotten items and
            streamlines your entire inventory process.
          </p>

          <div className="mb-16">
            <img
              src="src/public/modern-restaurant-interior-with-professional-kitch.png"
              alt="Professional restaurant interior"
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <ClipboardDocumentListIcon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Intuitive Ordering
              </h3>
              <p className="text-gray-600">
                Create stock lists in minutes with our intuitive interface
                designed for busy kitchens.
              </p>
            </div>
            <div>
              <UsersIcon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Complete Coverage
              </h3>
              <p className="text-gray-600">
                Manage everything from produce to cleaning supplies across
                multiple locations.
              </p>
            </div>
            <div>
              <ChartBarIcon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Effortless Tracking
              </h3>
              <p className="text-gray-600">
                Get instant order summaries grouped by supplier for efficient
                purchasing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-sidebar">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Designed by Kitchen Professionals
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            We understand the unique challenges of restaurant operations because
            we've lived them. StockUp was built by chefs who know what it takes
            to run a successful kitchen.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="flex items-start gap-4">
              <CheckIcon className="h-6 w-6 text-success mt-1 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Built for Real Kitchens
                </h3>
                <p className="text-gray-600">
                  Tested in high-volume restaurants and refined based on real
                  feedback from kitchen professionals.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckIcon className="h-6 w-6 text-success mt-1 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Industry Expertise
                </h3>
                <p className="text-gray-600">
                  Our team combines decades of restaurant experience with modern
                  technology solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Stop Forgetting, Start Stocking Up.
          </h2>
          <Link to="/register">
            <button className="bg-primary hover:bg-logo text-white px-12 py-4 text-xl rounded-md transition-colors">
              Get Started Today
            </button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border bg-background py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-500">
            &copy; 2024 StockUp. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
