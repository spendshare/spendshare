class Api::V1::BillsController < ApplicationController
  def create

    p "XXXX"
    p params.as_json

    ok('hi')


    # bill = Bill.new(params)
    # bill.save!

    # ok(bill.serialize)
  end

  def all
    ok(Bill.all)
  end
end
