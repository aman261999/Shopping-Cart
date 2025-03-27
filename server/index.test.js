// @vitest-environment node
import request from 'supertest';
import express from 'express';
import fs from 'fs';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import app from './index.js'; 

// Mock file system
vi.mock('fs');

const mockData = {
    storeData: [
        { id: 1, type: 'T-shirt', gender: 'male', color: ['red'], size: ['M'] },
        { id: 2, type: 'Jeans', gender: 'female', color: ['blue'], size: ['L'] }
    ]
};

beforeAll(() => {
    fs.readFileSync.mockReturnValue(JSON.stringify(mockData));
});

describe('GET /getProducts', () => {
    it('should return all products', async () => {
        const res = await request(app).get('/getProducts');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockData);
    });
});

describe('POST /getFilteredProducts', () => {
    it('should return filtered products by type', async () => {
        const res = await request(app).post('/getFilteredProducts').send({ type: 'T-shirt' });
        expect(res.status).toBe(200);
        expect(res.body).toEqual([mockData.storeData[0]]);
    });

    it('should return filtered products by gender', async () => {
        const res = await request(app).post('/getFilteredProducts').send({ gender: 'female' });
        expect(res.status).toBe(200);
        expect(res.body).toEqual([mockData.storeData[1]]);
    });
});

describe('POST /getSingleProduct', () => {
    it('should return a single product by ID', async () => {
        const res = await request(app).post('/getSingleProduct').send({ id: 1 });
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockData.storeData[0]);
    });

    // it('should return 404 if product is not found', async () => {
    //     const res = await request(app).post('/getSingleProduct').send({ id: 99 });
    //     expect(res.status).toBe(404);
    //     expect(res.body).toEqual({ error: 'Product not found' });
    // });
});
