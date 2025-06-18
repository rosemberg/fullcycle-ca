import { app, sequelize } from "../express";
import request from "supertest";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../product/repository/sequelize/product.repository";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should list all products", async () => {
    const productRepository = new ProductRepository();
    
    // Create two products
    const product1 = new Product("1", "Product 1", 100);
    const product2 = new Product("2", "Product 2", 200);
    
    await productRepository.create(product1);
    await productRepository.create(product2);

    // Test JSON response
    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    
    const productResponse1 = listResponse.body.products[0];
    expect(productResponse1.id).toBe(product1.id);
    expect(productResponse1.name).toBe(product1.name);
    expect(productResponse1.price).toBe(product1.price);
    
    const productResponse2 = listResponse.body.products[1];
    expect(productResponse2.id).toBe(product2.id);
    expect(productResponse2.name).toBe(product2.name);
    expect(productResponse2.price).toBe(product2.price);

    // Test XML response
    const listResponseXML = await request(app)
      .get("/product")
      .set("Accept", "application/xml")
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<id>1</id>`);
    expect(listResponseXML.text).toContain(`<name>Product 1</name>`);
    expect(listResponseXML.text).toContain(`<price>100</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`<id>2</id>`);
    expect(listResponseXML.text).toContain(`<name>Product 2</name>`);
    expect(listResponseXML.text).toContain(`<price>200</price>`);
    expect(listResponseXML.text).toContain(`</products>`);
  });
});