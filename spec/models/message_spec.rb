require 'rails_helper'

describe Message do
  describe '#create' do
    it "is valid with a body" do
      message = build(:message, image: nil)
      expect(message).to be_valid
    end

    it "is valid with an image although without a body" do
      message = build(:message, body: nil)
      expect(message).to be_valid
    end

  end
end
