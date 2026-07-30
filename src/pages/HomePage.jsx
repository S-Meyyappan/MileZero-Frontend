import { useNavigate } from 'react-router';
import '../css/HomePage.css'

function HomePage() {
    const navigate = useNavigate()

  return (
    <div className="container my-5">
      <div className="hero-section">

        <div className="row align-items-center h-100">

          {/* Left Section */}
          <div className="col-lg-8 hero-content">

            <h1 className="display-4 mb-4 fw-bold">
              Every Journey Starts at MileZero. Start Yours Today
            </h1>

            <p className="lead mb-4 w-75">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui, quod alias nobis aliquid, laboriosam ex reprehenderit quasi harum repellat fugiat hic ab doloremque dolores possimus, aut velit praesentium officiis ullam!
            </p>

            <button className="btn btn-warning text-white fw-semibold px-4 py-2 rounded-pill" onClick={() => navigate("/vehicles")}>
              View All Cars
            </button>

          </div>

          {/* Right Section */}
          <div className="col-lg-4 d-flex justify-content-center my-2">

            <div className="card booking-card p-4 w-100">

              <h2 className="text-center fw-bold mb-4">
                Book your car
              </h2>

              <form>

                <div className="mb-3">
                  <select className="form-select rounded-2">
                    <option>Car Type</option>
                    <option>Car</option>
                    <option>SUV</option>
                    <option>Pickup</option>
                  </select>
                </div>

                <div className="mb-3">
                  <select className="form-select rounded-2">
                    <option>Pickup Location</option>
                    <option>Delhi</option>
                    <option>Mumbai</option>
                    <option>Bangalore</option>
                  </select>
                </div>

                <div className="mb-3">
                  <select className="form-select rounded-2">
                    <option>Drop Location</option>
                    <option>Delhi</option>
                    <option>Mumbai</option>
                    <option>Bangalore</option>
                  </select>
                </div>

                <div className="mb-3">
                  <input
                    type="datetime-local"
                    className="form-control rounded-2"
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="datetime-local"
                    className="form-control rounded-2"
                  />
                </div>

                <button
                  className="btn btn-warning text-white rounded-pill w-100 fw-semibold py-2"
                  onClick={() => navigate("/vehicles")}
                >
                  Book Now
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default HomePage;