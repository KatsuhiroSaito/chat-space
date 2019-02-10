require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe 'GET #index' do
    context "logged in" do
      before do
        login_user user
        get :index, params: { group_id: group.id }
      end

    end

    context "not logged in" do
    end
  end
end
