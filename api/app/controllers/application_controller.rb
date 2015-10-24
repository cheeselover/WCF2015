class ApplicationController < ActionController::API
  include ::ActionController::Cookies
  before_action :set_default_response_format

  private

    def set_default_response_format
      request.format = :json
    end

  protected

    def errors(model)
      { json: { errors: model.errors.full_messages }, status: :unprocessable_entity }
    end

    def model_not_found_error(model_name)
      { json: { errors: "Could not find #{model_name} with given id" }, status: :unprocessable_entity }
    end
end

