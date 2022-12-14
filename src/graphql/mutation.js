import { gql } from "@apollo/client";

const InsertProducts = gql`
    mutation MyMutation($object: products_insert_input = {}) {
        insert_products_one(object: $object) {
            id
            name
            price
            initial_stock
            final_stock
            total
        }
    }
`;

const DeleteProducts = gql`
    mutation MyMutation($id: Int!) {
        delete_products(where: { id: { _eq: $id } }) {
            affected_rows
            returning {
                id
                name
                price
                initial_stock
                final_stock
                total
            }
        }
    }
`;

const UpdateProducts = gql`
    mutation MyMutation2($object: products_set_input = {}, $id: Int!) {
        update_products(_set: $object, where: { id: { _eq: $id } }) {
            returning {
                id
                name
                price
                initial_stock
                final_stock
                total
            }
            affected_rows
        }
    }
`;

const InsertUsers = gql`
    mutation MyMutation($object: users_insert_input = {}) {
        insert_users_one(object: $object) {
            id
            username
            password
            is_admin
            email
        }
    }
`;

const DeleteUsers = gql`
    mutation MyMutation($id: Int!) {
        delete_users(where: { id: { _eq: $id } }) {
            affected_rows
            returning {
                id
                username
                password
                is_admin
                email
            }
        }
    }
`;

const UpdateUsers = gql`
    mutation MyMutation2($object: users_set_input = {}, $id: Int!) {
        update_users(_set: $object, where: { id: { _eq: $id } }) {
            returning {
                id
                username
                password
                is_admin
                email
            }
            affected_rows
        }
    }
`;

const DeleteOrders = gql`
    mutation MyMutation($id: Int!) {
        delete_orders(where: { id: { _eq: $id } }) {
            affected_rows
            returning {
                kode
                produk
                harga
                jenis
                tanggal
            }
        }
    }
`;

export { InsertProducts, DeleteProducts, UpdateProducts, InsertUsers, DeleteUsers, UpdateUsers, DeleteOrders };
