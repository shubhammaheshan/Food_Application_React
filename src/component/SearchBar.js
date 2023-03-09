import { useState } from "react";

const Search = ({
	allresturantList,
	setAllResturantList,
	filteredResturantsList,
	setFilteredResturantsList,
	searchKeyword,
	setSearchKeyword
}) => {
	return (
		<div className="search-container">
			<div className="inner-wrap ">
				<div className="box">
					<div className="coloumn">
						<div className="total-res">
							{filteredResturantsList?.length > 0
								? `${filteredResturantsList.length} resturants`
								: "no result found"}
						</div>
						<div className="search-box">
							<SearchBox
								filteredResturantsList={filteredResturantsList}
								setFilteredResturantsList={setFilteredResturantsList}
								allresturantList={allresturantList}
								setAllResturantList={setAllResturantList}
								searchKeyword={searchKeyword}
								setSearchKeyword={setSearchKeyword}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
function filterData(searchInput, resturantsList) {
	let searchData = resturantsList.filter((item) =>{
        if(item?.name){
            return item?.name?.toLowerCase().includes(searchInput.toLowerCase())
        }
        else {
            return item?.data?.name?.toLowerCase().includes(searchInput.toLowerCase())
        }
    });
	return searchData;
}

function SearchBox({
    filteredResturantsList,
	setFilteredResturantsList,
	allresturantList,
	setAllResturantList,
	searchKeyword,
	setSearchKeyword
}) {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<div className="search-box-input">
			<input
				data-testid="search-input"
				type="text"
				placeholder="Search for restaurants and food"
				value={searchKeyword}
				onChange={(e) => {
					setSearchKeyword(e.target.value)
					let filtered = filterData(e.target.value, allresturantList);
					setFilteredResturantsList(filtered);
				}
				}
				onFocus={() => setIsVisible(true)}
			/>

			<button
				onClick={() => {
					let filtered = filterData(searchKeyword, allresturantList);
					setFilteredResturantsList(filtered);
				}}
			>
				<span className="icon-magnifier" />
			</button>
		</div>
	);
}

export default Search;