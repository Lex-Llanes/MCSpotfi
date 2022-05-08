import { React } from "react"
import { Carousel } from "react-bootstrap"
import CarouselCard from "./carouselcard.js"



const CarouselComp = () => {

    return (
        <>
            <Carousel touch={true} interval={500}>

                <Carousel.Item>
                    {/* Checking if the Carousel Card component can be used */}
                    <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1527261834078-9b37d35a4a32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <CarouselCard />
                    {/* <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>


                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    alt="Second slide"
                    />
                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <CarouselCard />
                    </Carousel.Caption>
                </Carousel.Item>

                
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1459233313842-cd392ee2c388?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <CarouselCard />
                    </Carousel.Caption>
                </Carousel.Item>

            </Carousel>
        </>
    )
}




export default CarouselComp;