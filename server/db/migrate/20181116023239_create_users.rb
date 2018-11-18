class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name, index: true
      t.string :email, index: true, unique: true

      t.timestamps
    end
  end
end
