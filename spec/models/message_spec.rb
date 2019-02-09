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

    it "is valid with a body and an image" do
      message = build(:message)
      expect(message).to be_valid
    end

    it "is invalid without a body and an image" do
      message = build(:message, body: nil, image: nil)
      message.valid?
      expect(message.errors[:body]).to include("を入力してください")
    end

  end
end
