import { Injectable } from '@nestjs/common';

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  country?: string;
  city?: string;
}

export interface UserModificate {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  address?: string;
  phone?: string;
  country?: string;
  city?: string;
}

const users: User[] = [
  {
    id: 'c9d0b7e8-3b7c-4c0f-92e1-9a6c2e2d9b1a',
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    address: '123 Main St',
    phone: '555-1234',
    country: 'USA',
    city: 'New York',
  },
  {
    id: 'a6c2e2d9-4b7c-4c0f-92e1-9b1a3b7c2e8c',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'password456',
    address: '456 Elm St',
    phone: '555-5678',
    country: 'Canada',
    city: 'Toronto',
  },
  {
    id: 'b7c2e2d9-3b7c-4c0f-92e1-9a6c2e9d1b1a',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    password: 'password789',
    address: '789 Oak St',
    phone: '555-9012',
    country: 'UK',
    city: 'London',
  },
  {
    id: 'd8e9f0a1-5b8c-4d1e-92f2-1b7c9e0d3a6b',
    name: 'Bob Brown',
    email: 'bob.brown@example.com',
    password: 'password101',
    address: '101 Pine St',
    phone: '555-3456',
    country: 'Australia',
    city: 'Sydney',
  },
  {
    id: 'e1f2a3b4-6c9d-4e2f-92g3-2c8d9e1f4b7c',
    name: 'Charlie Davis',
    email: 'charlie.davis@example.com',
    password: 'password202',
    address: '202 Maple St',
    phone: '555-7890',
    country: 'Germany',
    city: 'Berlin',
  },
  {
    id: 'f3a4b5c6-7d8e-4f3g-92h4-3d9e2f3a5b8c',
    name: 'David Evans',
    email: 'david.evans@example.com',
    password: 'password303',
    address: '303 Cedar St',
    phone: '555-1235',
    country: 'France',
    city: 'Paris',
  },
  {
    id: 'g5b6c7d8-8e9f-4g5h-92i5-4e1f3g5a6b9d',
    name: 'Eve Foster',
    email: 'eve.foster@example.com',
    password: 'password404',
    address: '404 Birch St',
    phone: '555-6789',
    country: 'Italy',
    city: 'Rome',
  },
  {
    id: 'h7c8d9e0-9f0g-4h6i-92j6-5f2g4h7a8c0e',
    name: 'Frank Green',
    email: 'frank.green@example.com',
    password: 'password505',
    address: '505 Spruce St',
    phone: '555-3457',
    country: 'Spain',
    city: 'Madrid',
  },
  {
    id: 'i8d9e0f1-0g1h-4i7j-92k7-6g3h5i8b9c1d',
    name: 'Grace Hill',
    email: 'grace.hill@example.com',
    password: 'password606',
    address: '606 Willow St',
    phone: '555-7891',
    country: 'Netherlands',
    city: 'Amsterdam',
  },
];

let id = 3;
const idString = String(id);

@Injectable()
export class UsersRepository {
  async getUsers(page: number, limit: number) {
    if (!page) page = 1;
    if (!limit) limit = 5;

    const start = (page - 1) * limit;
    const end = start + limit;

    const userToRenderize = users.slice(start, end);

    const usersWithoutPassword = await userToRenderize.map(
      ({ password, ...userNoPassword }) => userNoPassword,
    );

    return usersWithoutPassword;
  }

  async getUserById(id: string) {
    const user = users.find((user) => user.id === id);

    if (!user) return 'Usuario no encontrado';

    const newUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      country: user.country,
      city: user.city,
    };
    return newUser;
  }

  async getUsersAuth(): Promise<User[]> {
    //!por borrar
    return await users;
  }

  async getUserByEmail(email) {
    const userByEmail = users.find((user) => user.email === email);

    return userByEmail;
  }

  async createUser(user: User) {
    const newUser: User = { id: idString, ...user };
    id++;
    users.push(newUser);
    const userId = newUser.id;
    return userId;
  }

  async updateUser(dataUser: UserModificate, id: string) {
    //1. Buscamos el usuario

    const userFound = users.find((user) => user.id === id);

    //1.1 Si no existe, retornamos 'Usuario no registrado'
    if (!userFound) return 'Usuario no encontrado';

    //1.2 Si el usuario existe, actualizamos(2)
    if (dataUser.name) userFound.name = dataUser.name;
    if (dataUser.email) userFound.email = dataUser.email;
    if (dataUser.password) userFound.password = dataUser.password;
    if (dataUser.address) userFound.address = dataUser.address;
    if (dataUser.phone) userFound.phone = dataUser.phone;
    if (dataUser.country) userFound.country = dataUser.country;
    if (dataUser.city) userFound.city = dataUser.city;

    return userFound.id;
  }

  async deleteUser(id: string) {
    const userFoundIndex = users.findIndex((user) => user.id === id);
    if (userFoundIndex === -1) return 'Usuario no encontrado';

    users.splice(userFoundIndex, 1);

    return id;
  }
}
