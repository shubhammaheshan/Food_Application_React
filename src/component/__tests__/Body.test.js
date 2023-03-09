import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import store from "../../store";
import Body from "../Body";
import { restaurantData } from "../mocks/data";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(restaurantData);
    },
  });
});
test("Search result on Home Page", async () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Body />
      </Provider>
    </StaticRouter>
  );

  await waitFor(() => expect(body.getByTestId("res-list")));

  const resList = body.getByTestId("res-list");

  expect(resList.children.length).toBe(15);
});
