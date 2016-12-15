class ChangeUserGroups < ActiveRecord::Migration[5.0]
  def change
    rename_column :user_groups, :owner_id, :user_id
  end
end
