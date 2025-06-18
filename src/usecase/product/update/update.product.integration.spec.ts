import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    // Create a product
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    // Update the product
    const input = {
      id: "1",
      name: "Product 1 Updated",
      price: 200,
    };

    const output = await usecase.execute(input);

    expect(output).toEqual(input);

    // Verify the product was updated in the database
    const updatedProduct = await productRepository.find("1");
    expect(updatedProduct.name).toBe(input.name);
    expect(updatedProduct.price).toBe(input.price);
  });
});