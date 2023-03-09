import React, { useState, useEffect } from "react";
import Resturant from "./Resturant";
import { Restaurant_Data } from "./config";
import Skeleton from "./Skeleton";
import { Carousel } from "./Carousel";
import { Link } from "react-router-dom";
import Search from "./SearchBar";



export default function Body() {
	const [allresturantList, setAllResturantList] = useState([]);
	const [filteredResturantsList, setFilteredResturantsList] = useState([]);
	const [searchKeyword, setSearchKeyword] = useState("");

	useEffect(() => {
		if (searchKeyword.length == 0) {
			getRestaurants();
		}
	}, [searchKeyword]);


	async function getRestaurants() {
		const data = await fetch(
			"https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.651708&lng=75.925678&page_type=DESKTOP_WEB_LISTING",
		);
		const json = await data.json();
		setAllResturantList(json?.data?.cards[2]?.data?.data?.cards);
		setFilteredResturantsList(json?.data?.cards[2]?.data?.data?.cards);
	}

	// console.log(resturantList.length);
	return (
		<>
			<Carousel />
			<div className="body-content">
				<div className="inner-body-content">
					<div className="all-resturant">
						{allresturantList?.length === 0 ? (
							<div className="skeleton">
								{Array(4)
									.fill("")
									.map((e, index) => (
										<Skeleton key={index} />
									))}
							</div>
						) : (
							<>
								<Search
									filteredResturantsList={filteredResturantsList}
									setFilteredResturantsList={setFilteredResturantsList}
									allresturantList={allresturantList}
									setAllResturantList={setAllResturantList}
									searchKeyword={searchKeyword}
									setSearchKeyword={setSearchKeyword}

								/>
								<div className="resturants-margin">
									<div className="card-row" data-testid="res-list">
										{filteredResturantsList?.map((restaurant) => {
											return (
												<div key={restaurant.data.id}>
													<Link
														// to={"/restaurant/" + restaurant.data.id}
														to={`/restaurant/${restaurant.data.id}`}
														className="card-item"
														
													>
														<Resturant {...restaurant.data} />
													</Link>
												</div>
											);
										})}
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}


