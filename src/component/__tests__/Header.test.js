import { render } from "@testing-library/react";
import { Header } from "../Header";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import store from "../../store";
test("Logo should load on rendering header", () => {
  const header = render(
    <StaticRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </StaticRouter>
  );

  const logo = header.getAllByTestId("logo");
  expect(logo[0].src).toBe("https://img.icons8.com/color/48/null/just-eat.png");
});

test("cart should have 0 item on rendering header", () => {
  const header = render(
    <StaticRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </StaticRouter>
  );

  const cart = header.getByTestId("cart");
  expect(cart.innerHTML).toBe("0");
});
