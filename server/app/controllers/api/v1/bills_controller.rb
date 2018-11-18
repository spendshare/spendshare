class Api::V1::BillsController < ApplicationController
  def create

    bill = Bill.new(params)
    bill.save!

    ok(bill.serialize)
  end
end
