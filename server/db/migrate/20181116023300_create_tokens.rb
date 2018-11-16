class CreateTokens < ActiveRecord::Migration[5.2]
  def change
    create_table :tokens do |t|
      t.string :token
      t.datetime :valid_until
      t.user :user

      t.timestamps
    end
  end
end
