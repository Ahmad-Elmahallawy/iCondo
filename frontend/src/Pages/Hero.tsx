import '../Style/LandingPage/Hero.css'

const Hero = () => {
    return (
        <div data-testid='hero' className='hero'>
            <div className='container'>
                <div className='content'>
                    <div className='col-1'>
                        <h1>Welcome to your new home</h1>
                        <p>Lorem ipsum dolor sit amet, consec tetur adipisicing elit.
                            Architecto iure fuga deleniti sit! Cum doloribus, nesciunt
                            laboriosam eos praesentium veritatis!</p>
                    </div>
                    <div className='col-2'>
                        <div className='img-layout'>
                            <div className='img-container'>
                                <img src="Assets/registration-room.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Hero