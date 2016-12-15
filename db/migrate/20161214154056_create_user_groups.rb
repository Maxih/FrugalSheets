class CreateUserGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :user_groups do |t|
      t.integer :owner_id, null: false, index: true
      t.integer :group_id, null: false, index: true

      t.timestamps
    end
  end
end
