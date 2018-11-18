class Api::V1::BillsController < ApplicationController
  def create

    p params

    ok('hi')

    # bill = Bill.new(params)
    # bill.save!

    # ok(bill.serialize)
  end
end
