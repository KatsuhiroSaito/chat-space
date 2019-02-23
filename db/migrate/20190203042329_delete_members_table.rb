class DeleteMembersTable < ActiveRecord::Migration[5.0]
  def up
    drop_table :members
  end

  def down
  end
end
