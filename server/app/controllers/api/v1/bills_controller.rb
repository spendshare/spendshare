class Api::V1::BillsController < ApplicationController
  def create

    p params

    ok()

    # bill = Bill.new(params)
    # bill.save!

    # ok(bill.serialize)
  end
end
