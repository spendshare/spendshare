# frozen_string_literal: true

class Initialize < ActiveRecord::Migration[5.2]
  def change
    create_table :participations do |t|
      t.decimal :amount, precision: 8, scale: 2
      t.references :bill
      t.references :member
      t.timestamps
    end

    create_table :members do |t|
      t.references :user
      t.references :group
      t.timestamps
    end

    create_table :bills do |t|
      t.string :title
      t.references :added_by, index: true, foreign_key: { to_table: :members }
      t.references :group
      t.boolean :deleted
      t.timestamps
    end

    create_table :groups do |t|
      t.string :name
      t.timestamps
    end

    create_table :users do |t|
      t.string :name
      t.string :email
      t.timestamps
    end

    create_table :tokens do |t|
      t.string :token, index: true
      t.datetime :valid_until
      t.belongs_to :user, index: true
      t.timestamps
    end

    g = Group.new(name: 'All')
    g.save!

    u = User.new(name: 'Marian Bubak', email: 'bubak@agh.edu.pl')
    u.save!

    m = Member.new(user_id: u.id, group_id: g.id)
    m.save!
  end
end
