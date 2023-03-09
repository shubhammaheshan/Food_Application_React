import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import store from "../../store";
import Search from "../SearchBar";
import { restaurantData } from "../mocks/data";

global.fetch = jest.fn(() => {
  // gives a redable stream
  return Promise.resolve({
    json: () => Promise.resolve(restaurantData),
  });
});

test("Search for string(food) on Homepage", async () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Search />
      </Provider>
    </StaticRouter>
  );
  const input = body.getByTestId("search-input");
  expect(input.tagName).toBe("INPUT");
});
