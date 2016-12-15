# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all

user = User.create!(email: "mackshempfling@gmail.com", password: "password", firstname: "Max", lastname: "Hempfling")
user1 = User.create!(email: "bob@gmail.com", password: "password", firstname: "Bob", lastname: "Evans")


Group.delete_all

group = Group.create!(name: "Max's Sheets", owner: user)
group1 = Group.create!(name: "Bob's Sheets", owner: user1)

user.groups.push(group1);
user1.groups.push(group);

Document.delete_all
# doc1 = Document.create(name: "Test Document 1", author: user, content: "{}")
# doc1 = Document.create(name: "Test Document 2", author: user, content: "{}")
# doc1 = Document.create(name: "Test Document 3", author: user, content: "{}")
# doc1 = Document.create(name: "Test Document 4", author: user, content: "{}")
