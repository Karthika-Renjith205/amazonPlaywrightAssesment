import { test, expect, APIRequestContext } from '@playwright/test';
import { config } from '../../config/ConfigManager';
import petPayloadTemplate from './data/petPayload.json';
import headers from './data/headers.json';

/**
 * Petstore API - Pet CRUD
 * Covers Create, Read, Update and Delete against https://petstore.swagger.io/v2/pet
 * Tests run serially since Read/Update/Delete all act on the pet created in the first test.
 */
test.describe.serial('Petstore API - Pet CRUD', () => {
  let apiContext: APIRequestContext;
  let petId: number;
  let petName: string;

  // Deep-clones the JSON template (via stringify/parse) so each call gets its own copy, then sets id/name
  const buildPetPayload = (id: number, name: string) => {
    const payload = JSON.parse(JSON.stringify(petPayloadTemplate));
    payload.id = id;
    payload.name = name;
    return payload;
  };

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: config.getPetstoreApiBaseUrl(),
      extraHTTPHeaders: headers,
    });
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('Create a Resource - POST /pet creates a new pet', async () => {
    // Dynamically generated test data so repeated runs don't collide
    petId = Date.now();
    petName = `TestPet_${petId}`;
    const payload = buildPetPayload(petId, petName);
    console.log('Request payload:', JSON.stringify(payload));

    const response = await apiContext.post('pet', { data: payload });
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    console.log('Response body:', JSON.stringify(body));
    expect(body.id).toBe(petId);
    expect(body.name).toBe(petName);
  });

  test('Read and Verify - GET /pet/{id} returns the created pet', async () => {
    const response = await apiContext.get(`pet/${petId}`);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    console.log('Response body:', JSON.stringify(body));
    expect(body.id).toBe(petId);
    expect(body.name).toBe(petName);
  });

  test('Update a Resource - PUT /pet updates the pet name', async () => {
    const updatedName = `${petName}_Updated`;
    const payload = buildPetPayload(petId, updatedName);
    console.log('Request payload:', JSON.stringify(payload));

    const response = await apiContext.put('pet', { data: payload });
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    console.log('Response body:', JSON.stringify(body));
    expect(body.id).toBe(petId);
    expect(body.name).toBe(updatedName);

    petName = updatedName;
  });

  test('Delete and Confirm - DELETE /pet/{id} removes the pet', async () => {
    const deleteResponse = await apiContext.delete(`pet/${petId}`);
    expect(deleteResponse.ok()).toBeTruthy();

    const getResponse = await apiContext.get(`pet/${petId}`);
    expect(getResponse.status()).toBe(404);
  });
});
