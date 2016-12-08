class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :email, null: false, index: true
      t.string :password_digest, null: false
      t.string :session_token, null: false, index: true
      t.string :firstname, null: false
      t.string :lastname, null: false
      t.timestamps
    end
  end
end
