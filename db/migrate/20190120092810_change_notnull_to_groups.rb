class ChangeNotnullToGroups < ActiveRecord::Migration[5.0]
  def change
    change_column_null :groups, :name, false
  end
end
